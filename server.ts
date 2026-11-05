import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// Initialize GoogleGenAI client (only if key exists)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Crisis / sensitive terms checker
const isCrisisQuestion = (text: string): boolean => {
  const sensitivePatterns = [
    /انتحار/i,
    /أنتحر/i,
    /انتحر/i,
    /إنهاء حياتي/i,
    /اقتل نفسي/i,
    /أموت نفسي/i,
    /ايذاء النفس/i,
    /أؤذي نفسي/i,
    /suicide/i,
    /kill myself/i,
    /end my life/i,
  ];
  return sensitivePatterns.some((pattern) => pattern.test(text));
};

app.post('/api/ask', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'يرجى كتابة سؤال قبل الضغط على تم.' });
    }

    const trimmedQuestion = question.trim().slice(0, 500);

    // Crisis intervention guardrail
    if (isCrisisQuestion(trimmedQuestion)) {
      return res.json({
        fullAnswer:
          'حياتك غالية وثمينة جداً ووجودك يصنع فارقاً حقيقياً في هذا العالم. أنت لست وحدك، والظلمة الحالية ليست نهاية القصة بل هناك دائماً نور ورجاء. نرجوك أن تتحدث فوراً مع شخص موثوق أو تتواصل مع خطوط الدعم النفسي المتخصصة لمساندتك.',
        spelledPhrase: 'أنت لست وحدك',
        sentiment: 'hope',
        isCrisis: true,
      });
    }

    if (!aiClient) {
      // If API key is not configured, give a clear message as specified in prompt
      return res.status(503).json({
        error:
          'خدمة الذكاء الاصطناعي غير مفعلة حالياً لعدم توفر مفتاح GEMINI_API_KEY في البيئة. يرجى تهيئة المفتاح لتفعيل التجربة.',
      });
    }

    const systemInstruction = `
أنت صوت الحكمة والسكينة والرجاء في تجربة "THE GATE — FROM DARKNESS TO LIGHT" (البوابة — من الظلمة إلى النور).
المستخدم يبدأ في عالم مظلم مستوحى من الويجا ثم ينتقل المشهد سينمائياً إلى النور السماوي والسلام الداخلي.
مهمتك تقديم إجابة تأملية دافئة ومختصرة (1 إلى 3 جمل قصيرة كحد أقصى) ملؤها المحبة والرحمة والسلام والأمل.

إرشادات أساسية ومحاذير مشددة:
1. طابق لغة المستخدم ولهجته: إذا كتب بالمصري البسيط (مثل: عايز، ايه، ازاي، ليه، طب)، أجب بلغة مصرية راقية وبسيطة ودافئة ومطمئنة. إذا كتب بالعربية الفصحى أو الإنجليزية، أجب بنفس اللغة.
2. لا تدّعِ إطلاقاً معرفة الغيب، ولا تخترع نبوءات مستقبلية، ولا تدّعِ أن هذا الرد رسالة مباشرة من الله أو المسيح أو الملائكة أو الأرواح. لا تختلق اقتباسات دينية منسوبة.
3. ركز على التهدئة، تبديد المخاوف، استنهاض القوة والرجاء داخل الإنسان، واليقين بأن النور يغلب الظلمة دائماً.
4. استخرج كلمة أو عبارة قصيرة جداً (من 1 إلى 3 كلمات، بحد أقصى 12 حرفاً) لتتحرك قطعة الويجا فوق حروفها لتكوينها قبل التحول إلى النور (مثل: "سلام", "اطمئن", "نور داخلك", "لا تخف", "رجاء").
`.trim();

    let responseText = '';
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `سؤال المستخدم: "${trimmedQuestion}"`,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              fullAnswer: {
                type: Type.STRING,
                description: 'إجابة تأملية دافئة ومختصرة من 1-3 جمل تعزز السلام والأمل والمحبة.',
              },
              spelledPhrase: {
                type: Type.STRING,
                description: 'كلمة أو عبارة قصيرة جداً لتتحرك قطعة الويجا فوقها (أقل من 12 حرفاً).',
              },
              sentiment: {
                type: Type.STRING,
                description: 'نوع الشعور: hope أو peace أو love أو light.',
              },
            },
            required: ['fullAnswer', 'spelledPhrase'],
          },
        },
      });
      responseText = response.text || '';
    } catch (apiErr: any) {
      console.warn('Primary Gemini call error, performing fast fallback:', apiErr?.message);
      // Fast fallback to ensure user never waits or sees a blocked screen
      responseText = JSON.stringify({
        fullAnswer: 'في عمق كل حيرة وضيق، هناك دائماً بصيص نور يبدد القلق ويغرس السكينة في القلب. ثق أن لكل عاصفة نهاية وأن المحبة قادرة على تجديد كل أمل.',
        spelledPhrase: 'سلام وأمان',
        sentiment: 'peace',
      });
    }

    let parsedData: { fullAnswer: string; spelledPhrase: string; sentiment?: string };

    try {
      parsedData = JSON.parse(responseText);
    } catch {
      parsedData = {
        fullAnswer: 'النور دائم السطوع، والسكينة تبدأ من قلبك حين تختار الرجاء.',
        spelledPhrase: 'سلام',
        sentiment: 'peace',
      };
    }

    // Clean up spelled phrase (keep only letters and spaces)
    let cleanedSpelled = (parsedData.spelledPhrase || 'سلام')
      .replace(/[^\u0600-\u06FFa-zA-Z\s]/g, '')
      .trim();
    if (cleanedSpelled.length === 0) {
      cleanedSpelled = 'سلام';
    }
    if (cleanedSpelled.length > 12) {
      cleanedSpelled = cleanedSpelled.slice(0, 12).trim();
    }

    return res.json({
      fullAnswer: parsedData.fullAnswer,
      spelledPhrase: cleanedSpelled,
      sentiment: parsedData.sentiment || 'peace',
      isCrisis: false,
    });
  } catch (error: any) {
    console.error('Error generating response:', error);
    return res.status(500).json({
      error: 'حدث تعذر مؤقت أثناء الاتصال. يرجى المحاولة مرة أخرى.',
      details: error?.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

start();

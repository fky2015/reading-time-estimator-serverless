// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  let text = "";
  if (req.body && req.body.text) {
    text = req.body.text;
  } else if (req.query.text) {
    text = req.query.text;
  } else if (req.cookies.text) {
    text = req.cookies.text;
  }

  let words_per_minute = 200
  if (req.query.words_per_minute) {
    words_per_minute = Number(req.query.words_per_minute)
  }

  const wasm = await import("reading-time-estimator-ng");
  res.statusCode = 200;
  const [words, characters, cjk, whitespaces] = wasm.greet(text);

  const minutes = words / words_per_minute

  res.json({ words, characters, cjk, whitespaces, minutes });
};

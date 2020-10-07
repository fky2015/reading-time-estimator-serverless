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

  let word_per_minutes = 200
  if (req.query.word_per_minutes) {
    word_per_minutes = number(req.query.word_per_minutes)
  }

  const wasm = await import("reading-time-estimator-ng");
  res.statusCode = 200;
  const [words, characters, cjk, whitespaces] = wasm.greet(text);

  const minutes = words / word_per_minutes

  res.json({ words, characters, cjk, whitespaces, minutes });
};

import { NextApiRequest, NextApiResponse } from 'next';
import { PasteType } from 'types';
import supabaseClient from 'utils/supabase';
import filterBadWords from 'utils/filterBadWords';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Allow only POST requests
  if (req.method !== 'POST') {
    res.status(400).json({ message: 'Only POST requests allowed.' });
    return;
  }

  // Get the records from body
  const { code, language, title, pasteId, userId, _public, _private } =
    req.body;

  if (!userId) {
    return res.status(400).json({ message: "Can't delete anonymous paste" });
  }

  // Add them to supabase
  const { data, error } = await supabaseClient
    .from<PasteType>('Pastes')
    .update({
      code,
      language,
      title: filterBadWords(title),
      public: _public,
      private: _private
    })
    .eq('pasteId', pasteId);

  // Debugging
  console.log(data);
  console.log(error);

  // Send back the responses.
  res.json({ data, error });
};

export default handler;

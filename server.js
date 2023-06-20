const express = require('express');
const app = express();
const { Configuration, OpenAIApi } = require('openai');
const process = require('process');

app.use(express.static('public'));
app.use(express.json());
require('dotenv').config();

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
  
});

const openai = new OpenAIApi(configuration);

app.post('/api/openai', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await openai.createCompletion({
            model: 'davinci:ft-personal-2023-06-20-10-41-24',
            prompt: prompt,
            presence_penalty: 0,
            frequency_penalty: 0.3,
            max_tokens: 100,
            temperature: 0,
            stop: ['\n', '->']
        });

        res.json(response.data.choices[0].text);

    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

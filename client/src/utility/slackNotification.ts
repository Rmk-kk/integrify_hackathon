import axios from "axios";
import {TaskData} from "./models";


export const slackNotification = async (data:TaskData) => {
    const {title, description, priority, assigned} = data;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed).toLocaleDateString();
    const message = JSON.stringify(
        {'text' : data,
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "New Task was added!",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Type:*\n${title}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Assigned to:*\n${assigned.name}`
                        }
                    ]
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*When:*\n${today}`
                        }
                    ]
                },
            ]

        }
    );
    const res = await axios.post('https://hooks.slack.com/services/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', message)
    return res.data
}
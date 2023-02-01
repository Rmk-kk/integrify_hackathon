import axios from "axios";
import {TaskData} from "./models";


export const slackNotification = async (data:TaskData, link:string) => {
    const {title, priority, assigned} = data;

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
                            "text": `*Title:*\n${title}`
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
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Priority:*\n${priority.text}`
                        }
                    ]
                },
            ]

        }
    );
    console.log(message);
    const res = await axios.post(`${link}`, message)
    return res.data
}
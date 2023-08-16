import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import api from '../../services/backend';

export default function Chatbox() {
    let [messages, setMessages] = useState([{ "role": "assistant", "content": "Hi, what is your name?" }]);
    let [lastMessage, setLastMessage] = useState('');
    let [info, setInfo] = useState({})
    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            "messages": messages,
            info
        }

        if (messages[messages.length - 1].content === "Hi, what is your name?") {
            messages[messages.length - 1] = { "role": "user", "content": `Hi ${lastMessage} how can I help you today?` }
            setInfo(lastMessage)
        }
        else {
            messages.push({ "role": "user", "content": lastMessage })
        }

        messages = await api.post('/chat', payload);
        setMessages(messages.data)

        setLastMessage('')
        console.log(messages)
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography>
                Welcome to YYZ chat
            </Typography>

            <TextField
                id="outlined-basic"
                variant="outlined"
                multiline
                style={{ width: '800px' }}
                disabled={true}
                value={messages[messages.length - 1].content}
                maxRows={4}
            />
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '100px', marginTop: '10px' }}>
                {

                }
                <Stack direction="row" spacing={2} component='form' onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        style={{ width: '800px' }}
                        maxRows={4}
                        value={lastMessage}
                        onChange={(event) => setLastMessage(event.target.value)} />
                    <Button type='submit' variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Stack>
            </div>

        </div>
    )
};

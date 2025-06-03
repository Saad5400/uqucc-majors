import React from 'react';
import Admonition from '@theme-original/Admonition';
import { FaTelegram } from "react-icons/fa";

export default function TelegramAdmonition(props) {
  return <Admonition
    icon={<FaTelegram />}
    title={<a href="https://t.me/uqucc_chat" target="_blank" rel="noopener noreferrer">انضم إلى قروب الكلية! (غير رسمي)</a>}
    {...props}
  />;
}

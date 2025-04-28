import React from 'react';
import Admonition from '@theme-original/Admonition';
import { FaTelegram } from "react-icons/fa";

export default function TelegramAdmonition(props) {
  return <Admonition
    icon={<FaTelegram />}
    title={<a href="https://t.me/+5M8kuV7aAsRlNDU0" target="_blank" rel="noopener noreferrer">انضم لمجتمع الحملة</a>}
    {...props}
  />;
}
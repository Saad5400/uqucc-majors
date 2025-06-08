import React from 'react';
import Admonition from '@theme-original/Admonition';
import { FaTelegram } from "react-icons/fa";

export default function TelegramAdmonition(props) {
  return <Admonition
    icon={<FaTelegram />}
    title={<a href="https://t.me/uquccmajors" target="_blank" rel="noopener noreferrer">انضم إلى مجتمع الحملة، تقدر تسأل وتتناقش مع طلاب متخصصين!</a>}
    {...props}
  />;
}

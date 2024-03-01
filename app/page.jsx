'use client'

import Button from "@components/ui/Button";
import Message from "@components/ui/Message";
import { useState } from "react";

/* export const metadata = {
  title: 'Events - for share your events'
} */

export default function Home() {
  const [t, setT] = useState(false);
  return (
    <div>
      <Button onClick={() => setT(true)}>Test</Button>
      <Message show={t} onClose={() => setT(false)}>Test</Message>
    </div>
  );
}

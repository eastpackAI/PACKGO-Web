"use client";

import { useEffect } from "react";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Standard View uses the same conversation state as Spatial View.
 * The imported Web2 controls emit intent events, never create a second thread.
 */
export function StandardPackyBridge() {
  const { actions, addLocalNote, sendMessageText } = useExperience();

  useEffect(() => {
    const open = () => actions.openConversation();
    const ask = (event: Event) => {
      const text = (event as CustomEvent<{ text?: string }>).detail?.text;
      if (!text?.trim()) return;
      sendMessageText(text);
      actions.openConversation();
    };
    const note = (event: Event) => {
      const text = (event as CustomEvent<{ text?: string }>).detail?.text;
      if (text) addLocalNote(text);
    };

    window.addEventListener("packy:open", open);
    window.addEventListener("packy:ask", ask);
    window.addEventListener("packy:note", note);
    return () => {
      window.removeEventListener("packy:open", open);
      window.removeEventListener("packy:ask", ask);
      window.removeEventListener("packy:note", note);
    };
  }, [actions, addLocalNote, sendMessageText]);

  return null;
}

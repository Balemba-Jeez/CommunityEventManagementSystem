import React, { useState } from "react";
import TextType from "./TextType";

interface TextItem {
  text: string;
  icon: React.ReactNode;
}

interface TypingWithIconProps {
  items: TextItem[];
}

export default function TypingWithIcon({ items }: TypingWithIconProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {items[currentIndex].icon}
      <TextType
        key={currentIndex}          // force remount for each sentence
        text={items[currentIndex].text}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        loop={false}
        startOnVisible={false}
        onSentenceComplete={() => {
          setCurrentIndex((prev) => (prev + 1) % items.length);
        }}
      />
    </div>
  );
}

function TextClip(text: string) {
  if (text.length < 30) {
    return <div>{text}</div>;
  }

  return <div>{text.substring(0, 32) + "..."}</div>;
}

export default TextClip;

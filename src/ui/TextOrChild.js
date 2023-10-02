function TextOrChild({ children, text }) {
  if (text) return <span>{text}</span>;
  return <> {children} </>;
}

export default TextOrChild;

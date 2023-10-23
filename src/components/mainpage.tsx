import CodeInput from "./CodeInput";

export default function MainPage() {
  return (
    <div>
      <div>Flowscript Language Visualizer</div>
      <CodeInput />
      <div id="result">
        <div id="error"></div>
      </div>
    </div>
  );
}

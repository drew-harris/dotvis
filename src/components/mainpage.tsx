import CodeInput from "./CodeInput";

export default function MainPage() {
  return (
    <div>
      <div class="text-lg font-bold">Flowscript Language Visualizer</div>
      <div class="grid grid-cols-2 gap-2">
        <CodeInput />
        <div id="result">
          <div id="error"></div>
        </div>
      </div>
    </div>
  );
}

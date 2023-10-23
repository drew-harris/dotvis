export default function CodeInput() {
  return (
    <div class="">
      <textarea
        name="code"
        hx-post="/render"
        hx-target="#result"
        hx-trigger="keyup changed delay:500ms"
        placeholder="Enter flowscript here..."
        class="p-2 border-black w-full border-2"
      ></textarea>
    </div>
  );
}

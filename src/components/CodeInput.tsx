export default function CodeInput() {
  return (
    <div class="">
      <pre class="relative">
        <textarea
          name="code"
          hx-post="/render"
          hx-target="#result"
          hx-trigger="keyup changed delay:500ms"
          hx-indicator=".htmx-indicator"
          rows="20"
          placeholder="Enter FlowScript here..."
          class="relative p-2 border-black w-full border-2"
        ></textarea>
        <img
          src="/spinner"
          width="28"
          height="28"
          class="htmx-indicator absolute top-2 right-2"
        />
      </pre>
    </div>
  );
}

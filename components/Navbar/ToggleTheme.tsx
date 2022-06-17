function toggleTheme() {
  if (typeof window != "undefined") {
    console.log("entrando if");
    if (localStorage.getItem('theme') === 'dark' || localStorage.getItem('theme') === null) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }
}

// const style = {
// color: "yellow"
// style={style}
// ajeitar
// };

export default function () {
  return (
    <div >
      <checkbox id="toggleTheme" onClick={toggleTheme}>
        <label for="toggleTheme" class="cursor-pointer">
          <div class="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
            <div class="w-4 h-4 bg-white rounded-full shadow"></div>
          </div>
        </label>
      </checkbox>
    </div>
  )
}

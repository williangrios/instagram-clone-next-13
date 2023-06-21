import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import SuggestionArea from "./SuggestionArea"

export default function Feed() {
  return (
    <main className="flex flex-row max-w-6xl lg:mx-auto">
        <section className="w-full md:w-2/3 border-blue-300">
            {/* stories */}
            <Stories />
            {/* posts */}
            <Posts />
        </section>
        <section className="hidden md:flex md:flex-col md:w-1/3 p-6 mt-8 mx-3">
          <MiniProfile />
            {/* mini profile */}
            <SuggestionArea />

            {/* suggestions */}
        </section>
    </main>
  )
}

import NewResourceModal from "../components/newResourceModal/newResourceModal";
import ClassroomCard from "../components/ClassroomCard/classroomCard";

const classrooms = [
  "Post",
  "Frey",
  "Kelce",
  "Swift"
]

const allClassrooms = () => {


  return (
    <section>
      <h1>Classrooms</h1>
      <NewResourceModal />
      {classrooms.map((classroom, i) => <article key={i}><ClassroomCard classroom={classroom}/></article>)}
    </section>
  )
}

export default allClassrooms
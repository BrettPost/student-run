import NewResourceModal from "../components/newResourceModal/newResourceModal";
import StudentCard from "../components/StudentCard/studentCard";

const students = [
  "Brett",
  "Haley",
  "Jason",
  "Taylor"
]

const allStudents = () => {


  return (
    <section>
      <h1>Students</h1>
      <NewResourceModal />
      {students.map((student, i) => <article key={i}><StudentCard student={student}/></article>)}
    </section>
  )
}

export default allStudents
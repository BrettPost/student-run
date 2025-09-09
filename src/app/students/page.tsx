import NewResourceModal from "../components/newResourceModal/newResourceModal";

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
      <ul>
        {students.map((student, i) => <li key={i}>{student}</li>)}
      </ul>
    </section>
  )
}

export default allStudents
/* eslint-disable react/prop-types */
import { Button } from "antd"
import { useCallback, useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteNote, fetchNotes } from "../../actions/actions"
import NoteRow from "../../components/NoteRow"
import { useFetch } from "../../hooks/useFetch"

function Notes({ userId, notes, setNotes }) {
  const { isLoading } = useFetch(setNotes, fetchNotes, userId)

  const navigate = useNavigate()
  const handleCreateNote = useCallback(() => navigate("/create"), [navigate])

  const [noteToDelete, setNoteToDelete] = useState(null)

  const handleNoteClick = useCallback(
    (id) => {
      navigate(`/note/${id}`)
    },
    [navigate]
  )

  const handleNoteDelete = useCallback((id) => setNoteToDelete(id), [])

  const handleNoteEdit = useCallback(
    (id) => {
      navigate(`/edit/${id}`)
    },
    [navigate]
  )

  useEffect(() => {
    if (noteToDelete) {
      setNoteToDelete(null)
      deleteNote(noteToDelete)
        .then(async () => await fetchNotes(userId))
        .then(setNotes)
    }
  }, [noteToDelete, notes, setNotes, userId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-semibold mb-2">All notes</h1>
        <Button type="link" onClick={handleCreateNote}>
          Create
        </Button>
      </div>

      {notes.length === 0 && (
        <div className="flex flex-col w-fit">
          <p className="text-neutral-500 mt-4">Empty</p>
        </div>
      )}

      {notes.map((note) => (
        <NoteRow
          id={note.id}
          key={note.id}
          title={note.title}
          date={note.date}
          onClick={handleNoteClick}
          onDelete={handleNoteDelete}
          onEdit={handleNoteEdit}
        />
      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  notes: state.notes,
})

const mapDispatchToProps = (dispatch) => ({
  setNotes: (notes) => dispatch({ type: "SET_NOTES", payload: notes }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notes)

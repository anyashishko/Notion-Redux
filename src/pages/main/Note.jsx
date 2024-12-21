/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteNote, fetchNote } from "../../actions/actions"
import { useFetch } from "../../hooks/useFetch"
import { connect } from "react-redux"
import { Button, Popconfirm } from "antd"
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons"

function Note({ userId }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [note, setNote] = useState(null)

  useEffect(() => {
    if (note && note.userId !== userId) {
      navigate("/notes")
    }
  }, [userId, navigate, note])

  const handleDelete = useCallback(() => {
    deleteNote(id).then(() => navigate("/notes"))
  }, [id, navigate])
  const handleEdit = useCallback(() => {
    navigate(`/edit/${id}`)
  }, [navigate, id])

  const { isLoading } = useFetch(setNote, fetchNote, id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <Button
          type="default"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          size={"middle"}
          onClick={() => navigate("/notes")}
        />
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size={"middle"}
            onClick={handleEdit}
          />
          <Popconfirm
            title="Delete note"
            description="Are you sure to delete this note?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size={"middle"}
            />
          </Popconfirm>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-2 overflow-hidden text-ellipsis break-words">
        {note.title}
      </h1>
      <pre className="whitespace-pre-wrap">
        <code>{note.content}</code>
      </pre>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
  }
}

export default connect(mapStateToProps)(Note)

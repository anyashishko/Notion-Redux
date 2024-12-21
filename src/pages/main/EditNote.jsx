/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd"
import { fetchNote, updateNote } from "../../actions/actions"
import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { connect } from "react-redux"
import { useFetch } from "../../hooks/useFetch"

function EditNote({ userId }) {
  const [form] = Form.useForm()

  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [note, setNote] = useState(null)

  const handleNoteUpdate = useCallback(
    (values) => {
      console.log(values)

      setLoading(true)
      updateNote(id, {
        id,
        userId,
        date: note.date,
        ...values,
      }).then(() => {
        setLoading(false)
        navigate("/notes")
      })
    },
    [id, navigate, note, userId]
  )

  useEffect(() => {
    if (note && note.userId !== userId) {
      navigate("/notes")
    }
  }, [userId, navigate, note])

  const { isLoading } = useFetch(setNote, fetchNote, id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold mb-4">Edit note</h1>
      <Form
        form={form}
        className="max-w-lg"
        layout="vertical"
        initialValues={note}
        onFinish={handleNoteUpdate}
      >
        <Form.Item
          name="title"
          label="Name"
          rules={[{ required: true, message: "Enter name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="w-fit mt-2"
            loading={loading}
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userId: state.user.id,
  }
}

export default connect(mapStateToProps)(EditNote)

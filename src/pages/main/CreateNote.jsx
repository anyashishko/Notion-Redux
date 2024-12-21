/* eslint-disable react/prop-types */
import { Button, Form, Input } from "antd"
import { createNote } from "../../actions/actions"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"

function CreateNote({ userId }) {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleNoteCreate = useCallback(
    (values) => {
      console.log(values)

      setLoading(true)
      createNote({
        ...values,
        userId,
        date: Date.now(),
      }).then(() => {
        setLoading(false)
        navigate("/notes")
      })
    },
    [navigate, userId]
  )

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-semibold mb-4">Create note</h1>
      <Form
        form={form}
        className="max-w-lg"
        layout="vertical"
        onFinish={handleNoteCreate}
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
            Create
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

export default connect(mapStateToProps)(CreateNote)

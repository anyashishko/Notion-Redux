/* eslint-disable react/prop-types */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useCallback } from "react"

export default function NoteRow({
  id,
  title,
  date,
  onDelete,
  onEdit,
  onClick,
}) {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])
  const handleEdit = useCallback(() => onEdit(id), [id, onEdit])
  const handleRowClick = useCallback(() => onClick(id), [id, onClick])

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex flex-col py-2 flex-grow hover:cursor-pointer hover:opacity-55"
        onClick={handleRowClick}
      >
        <p className="text-lg font-semibold max-w-sm text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </p>
        <p className="text-neutral-500">{new Date(date).toDateString()}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size={"large"}
          onClick={handleEdit}
        />
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size={"large"}
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

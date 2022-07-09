import "antd/dist/antd.css";
import { Modal, Form, Input, Button, DatePicker, Checkbox, Radio } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

const AddEditModal = (props) => {
  const {
    addModal,
    setAddModal,
    editModal,
    setEditModal,
    data,
    setData,
    currentRecord,
  } = props;
  const [form] = Form.useForm();
  const [dateError, setDateError] = useState(null);

  const formReset = () => {
    form.setFieldsValue({
      key: undefined,
      status: "OPEN",
      title: undefined,
      description: undefined,
      tags: undefined,
      duedate: undefined,
    });
  };

  const handleCancelForm = () => {
    if (editModal) {
      setEditModal(false);
      formReset();
    } else {
      setAddModal(false);
      formReset();
    }
  };

  const handleDateError=(e)=>{
    if (e?._d?.getTime() < new Date().getTime()) {
      setDateError("error");
    } else {
      if (dateError) {
        setDateError(null);
      }
    }
  }
  
  const handleSubmit = (e) => {
    const timestamp = new Date();
    const newEntry = {
      key: timestamp.getTime(),
      timestamp: timestamp.toLocaleDateString(),
      title: e.title,
      description: e.description,
      duedate: e.duedate ? e.duedate.format("DD/MM/YYYY") : undefined,
      tags: e.tags,
      status: e.status,
    };

    localStorage.setItem("notes", JSON.stringify([...data, newEntry]));
    setData([...data, newEntry]);

    setAddModal(false);
    formReset();
  };

  const handleEdit = (e) => {
    const newData = data?.map((elem) => {
      if (elem?.key === e?.key) {
        const newElem = { ...elem };
        newElem.title = e.title;
        newElem.description = e.description;
        newElem.duedate = e?.duedate?.format("DD/MM/YYYY");
        newElem.tags = e?.tags
        newElem.status = e.status
        return newElem;
      }
      const newElem = { ...elem };
      return newElem;
    });
    setData([...newData]);

    localStorage.setItem("notes", JSON.stringify([...newData]));
    formReset();
    setEditModal(false);
  };

  useEffect(() => {
    if (form && editModal) {
      form.setFieldsValue({
        key: currentRecord?.key,
        status: currentRecord?.status,
        title: currentRecord?.title,
        description: currentRecord?.description,
        tags: currentRecord?.tags,
        duedate: currentRecord.duedate._isValid
          ? moment(currentRecord?.duedate, "DD/MM/YYYY")
          : undefined,
      });
    }
  }, [currentRecord]);


  

  return (
    <div>
      <Modal
        title={editModal ? "EDIT" : "Add New Task"}
        centered
        destroyOnClose
        visible={addModal || editModal}
        footer={[
          <Button type="primary" form="addForm" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
        onCancel={handleCancelForm}
      >
        <Form
          id="addForm"
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={editModal ? handleEdit : handleSubmit}
          autoComplete="off"
          initialValues={{
            status: "OPEN",
          }}
        >
          <Form.Item name="key" style={{ display: "none" }}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
                whitespace: true,
              },
            ]}
          >
            <Input showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea showCount maxLength={1000} />
          </Form.Item>
          <Form.Item
            name="duedate"
            label="Due Date"
            validateStatus={dateError}
            help={dateError ? "due date cannot be before Created date" : null}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={(e) => { handleDateError(e) }}
            />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Checkbox.Group>
              <Checkbox value="Important!">Important!</Checkbox>

              <Checkbox value="Done">Done</Checkbox>

              <Checkbox value="Temporary">Temporary</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value="OPEN">OPEN</Radio>
              <Radio value="WORKING">WORKING</Radio>
              <Radio value="DONE">DONE</Radio>
              <Radio value="OVERDUE">OVERDUE</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export const ShowMoreModal=({showMore,setShowMore,desc})=>{
  return (
      <Modal
        title={"Description"}
        centered
        destroyOnClose
        visible={showMore} 
        onCancel={()=>{setShowMore(false)}}
        footer={null}
      >
      {desc}
      </Modal>
  );
}

export const deleteModal=(data,setData,record)=>{
  const handleDelete = ()=>{
    const newData = data.filter(elem=>elem.key!==record.key)
    setData([...newData])
    localStorage.setItem("notes", JSON.stringify([...newData]));
  }
 
  Modal.confirm({
    title:"Are you sure, you want to delete this entry?",
    centered:true,
    okText:"Yes",
    okType:"danger",
    cancelText:"No",
    onOk:handleDelete
  })

}

export default AddEditModal;


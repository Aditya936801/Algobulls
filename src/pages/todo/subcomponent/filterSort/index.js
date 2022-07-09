import {  Tag } from "antd";
export const tagsView = (tags) => {
    const designTags = tags?.map((tag) => {
      let color;
      if (tag === "Important!") {
        color = "volcano";
      } else if (tag === "Done") {
        color = "green";
      } else if (tag === "Temporary") {
        color = "yellow";
      }

      return (
        <Tag color={color} key={tag}>
          {tag}
        </Tag>
      );
    });
    return designTags;
  };

  export const tagsFilter = [
    {
      text: "Important!",
      value: ["Important!"],
    },
    {
      text: "Done",
      value: ["Done"],
    },
    {
      text: "Temporary",
      value: ["Temporary"],
    },
  ];

 export const statusFilter = [
    {
      text: "OPEN",
      value: "OPEN",
    },
    {
      text: "WORKING",
      value: "WORKING",
    },
    {
      text: "DONE",
      value: "DONE",
    },
    {
      text: "OVERDUE",
      value: "OVERDUE",
    },
  ];
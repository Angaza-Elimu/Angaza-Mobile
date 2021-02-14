import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "notes",
      columns: [
          {name: "id", type: "number"},
        { name: "subtopic_id", type: "number" },
        { name: "notes", type: "string" },
      ]
    }),
    tableSchema({
      name: "topics",
      columns: [
        { name: "id", type: "number" },
        { name: "subject_id", type: "string"},
        { name: "topic_name", type: "string", isIndexed: true }
      ]
    }),
    tableSchema({
        name: "topics",
        columns: [
            
          { name: "id", type: "number" },
          { name: "topic_name", type: "string", isIndexed: true }
        ]
      }),
    tableSchema({
        name: "subtopics",
        columns: [
          { name: "id", type: "number" },
          { name: "topic_id", type: "number"},
          { name: "subtopic_name", type: "string", isIndexed: true }
        ]
      }),
     
  ]
});
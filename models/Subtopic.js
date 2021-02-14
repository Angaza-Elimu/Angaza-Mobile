import { Model } from "@nozbe/watermelondb";
import { field, date, children, relation } from "@nozbe/watermelondb/decorators";

export default class Subtopic extends Model {
  static table = "subtopics";

  static associations = {

    topics: { type: "belongs_to", key: "topic_id" },

    notes: { type: "has_many", foreignKey: "subtopic_id" },
  };

  @field("id") id;
  @field("subject_id") subject_id;
  @field("topic_name") topic_name;

  @children("notes") notes;
  @relation("topics", "topic_id") topics;
}
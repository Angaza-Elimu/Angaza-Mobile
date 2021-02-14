import { Model } from "@nozbe/watermelondb";
import { field, date, children, relation } from "@nozbe/watermelondb/decorators";

export default class Topic extends Model {
  static table = "topics";

  static associations = {
    subject: {type: "belongs_to", key: "subject_id"},
    subtopics: { type: "has_many", foreignKey: "topic_id" }
  };

  @field("id") id;
  @field("subject_id") subject_id;
  @field("topic_name") topic_name;

  @children("subtopics") subtopic;
  @relation("subject") subject;

}
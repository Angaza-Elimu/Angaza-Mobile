import { Model } from "@nozbe/watermelondb";
import { field, date, children } from "@nozbe/watermelondb/decorators";

export default class Subject extends Model {
  static table = "subjects";

  static associations = {

    subtopics: { type: "has_many", foreignKey: "topic_id" }
  };

  @field("id") id;
  @field("subject_id") subject_id;
  @field("topic_name") topic_name;

  @children("subtopics") subtopic;

  
}
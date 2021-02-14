import { Model } from "@nozbe/watermelondb";
import { field, date, children } from "@nozbe/watermelondb/decorators";

export default class Notes extends Model {
  static table = "notes";

  static associations = {
    subtopics: { type: "belongs_to", key: "subtopic_id" }
  };

  @field("id") id;
  @field("subtopic_id") subtopic_id;
  @field("notes") notes;
}
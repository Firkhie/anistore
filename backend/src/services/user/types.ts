import { schema } from "../../zapatos";

export type UserParams = {
  id: string;
}

export type PatchUserParams = schema.user.Updatable & schema.user_detail.Updatable;
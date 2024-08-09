import { createAction, props } from "@ngrx/store";
import { user } from "./interfaces/interfaces";

export const GetData = createAction(
    '[User] Get Data',
    props<{ users: user[], page: number }>()
  );
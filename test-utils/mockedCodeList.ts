import { CodeInterface } from "typings";

export const mockedCodeList: CodeInterface[] = [
  {
    id: "1",
    code_title: "code 1",
    description: "desc 1",
    code_block: "block 1",
    language: "python",
    inserted_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    number_views: 7,
    favorited_by: [],
    comments: [],
    associatedTo: [],
    associatedBy: [],
  },
  {
    id: "2",
    code_title: "code 2",
    description: "desc 2",
    code_block: "block 2",
    language: "python",
    inserted_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    number_views: 77,
    favorited_by: [],
    comments: [],
    associatedTo: [],
    associatedBy: [],
  },
  {
    id: "3",
    code_title: "code 3",
    description: "desc 3",
    code_block: "block 3",
    language: "python",
    inserted_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    number_views: 777,
    favorited_by: [],
    comments: [],
    associatedTo: [],
    associatedBy: [],
  },
];

export default mockedCodeList;

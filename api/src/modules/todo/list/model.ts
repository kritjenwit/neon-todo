import { db } from "../../../db";
import type { RequestBody } from "./type";

export const model = {
  async validate(body: RequestBody) {
    const { project_uuid } = body;
    try {
      const todos = await db.transaction(async (tx) => {
        const project = await tx.query.projects.findFirst({
          columns: {
            id: true,
          },
          where: (project, { eq }) => {
            return eq(project.project_uuid, project_uuid);
          },
        });

        if (!project) {
          return [];
        }

        const todos = await db.query.todos.findMany({
          where: (todos, { eq }) => {
            return eq(todos.project_id, project.id);
          },
        });

        return todos;
      });

      return todos;
    } catch (e) {
      throw new Error("Internal server error");
    }
  },
};

"use server";

import { api } from "@/shared/api";

const formatJson = (val: unknown): string => {
  let target = val;
  if (typeof target === "string") {
    try {
      target = JSON.parse(target);
    }
    catch {
      return target as string;
    }
  }

  // Handle API envelope structure: { body: { body: ... } } or { body: ... }
  if (target && typeof target === "object") {
    const obj = target as Record<string, unknown>;
    if (obj.body && typeof obj.body === "object") {
      const innerBody = obj.body as Record<string, unknown>;
      if (innerBody.body) {
        target = innerBody.body;
      }
      else {
        target = obj.body;
      }
    }
  }

  return JSON.stringify(target, null, 2);
};

const generateMockSchema = (prompt: string, prevSchema?: string): string => {
  if (prevSchema) {
    try {
      const parsed = JSON.parse(prevSchema);
      parsed.version = (parsed.version || 1) + 1;
      parsed.description = `Обновлено по запросу: "${prompt}"`;

      // If user mentions adding/validating something, adapt the workflow activities & definitions
      const cleanKey = prompt.toLowerCase().includes("email")
        ? "notificationEmail"
        : prompt.toLowerCase().includes("доставк") || prompt.toLowerCase().includes("delivery")
          ? "deliveryAddress"
          : prompt.toLowerCase().includes("оплат") || prompt.toLowerCase().includes("payment")
            ? "paymentDetails"
            : `customField_${Date.now().toString().slice(-4)}`;

      if (parsed.definitions?.inputValidateSchema?.properties) {
        parsed.definitions.inputValidateSchema.properties[cleanKey] = {
          type: "string",
          description: `Добавлено по запросу: ${prompt}`,
        };
      }

      if (Array.isArray(parsed.compiled?.activities)) {
        const validateAct = parsed.compiled.activities.find(
          (a: Record<string, unknown>) => a.id === "validateRequest",
        ) as Record<string, unknown> | undefined;
        const transformObj = validateAct?.transform as Record<string, unknown> | undefined;
        const schemaObj = transformObj?.inputValidateSchema as Record<string, unknown> | undefined;
        const propsObj = schemaObj?.properties as Record<string, unknown> | undefined;
        if (propsObj) {
          propsObj[cleanKey] = {
            type: "string",
            description: `Добавлено по запросу: ${prompt}`,
          };
        }
      }

      return JSON.stringify(parsed, null, 2);
    }
    catch {
      // ignore parse error and proceed
    }
  }

  const defaultMock = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "complex",
    name: "ordersWorkflow",
    tenantId: "default",
    version: 1,
    description: `Workflow: ${prompt}`,
    compiled: {
      start: "validateRequest",
      activities: [
        {
          id: "validateRequest",
          type: "transform",
          transition: "sendToKafka",
          transform: {
            inputValidateSchema: {
              type: "object",
              properties: {
                id: { type: "string" },
                items: {
                  type: "array",
                  items: { type: "string" },
                },
                customer: { type: "string" },
              },
              required: ["id", "items", "customer"],
            },
          },
        },
        {
          id: "sendToKafka",
          type: "workflow_call",
          transition: "respond",
          workflowCall: {
            type: "kafka_producer",
            topic: "orders.new",
            key: "order_id",
            value: "order_data",
          },
        },
        {
          id: "respond",
          type: "inject",
          transition: null,
          injectData: {
            outputValidateSchema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["ok", "error"],
                },
              },
              required: ["status"],
            },
          },
        },
      ],
    },
    definitions: {
      kafkaProducerConfig: {
        type: "object",
        properties: {
          bootstrapServers: { type: "string" },
          topic: { type: "string" },
        },
        required: ["bootstrapServers", "topic"],
      },
      kafkaConsumerConfig: {
        type: "object",
        properties: {
          bootstrapServers: { type: "string" },
          topic: { type: "string" },
          groupId: { type: "string" },
        },
        required: ["bootstrapServers", "topic", "groupId"],
      },
      restCallConfig: {
        type: "object",
        properties: {
          restCallTemplateDef: {
            type: "object",
            properties: {
              method: { type: "string", enum: ["GET", "POST", "PUT", "DELETE"] },
              uri: { type: "string" },
            },
            required: ["method", "uri"],
          },
        },
        required: ["restCallTemplateDef"],
      },
      inputValidateSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          items: { type: "array", items: { type: "string" } },
          customer: { type: "string" },
        },
        required: ["id", "items", "customer"],
      },
      outputValidateSchema: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["ok", "error"] },
        },
        required: ["status"],
      },
    },
  };

  return JSON.stringify(defaultMock, null, 2);
};

export const getFirstSchema = async (prompt: string): Promise<string> => {
  if (process.env.API) {
    try {
      const res = await api.post<string>("/schemas/workflows/generate", prompt);
      return formatJson(res);
    }
    catch (err) {
      console.warn("API request failed, using mock generator:", err);
    }
  }
  // Delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateMockSchema(prompt);
};

export const getSchema = async (prompt: string, schema: string): Promise<string> => {
  if (process.env.API) {
    try {
      const res = await api.post<string>("/schemas/workflows/edit", {
        current: schema,
        update: prompt,
      });
      return formatJson(res);
    }
    catch (err) {
      console.warn("API edit request failed, using mock generator:", err);
    }
  }
  // Delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateMockSchema(prompt, schema);
};

import { Button, Form, Space, Table } from "antd";

import {
  configurationColumns,
  fieldPrefix,
} from "app/form/components/configurations.constants";
import type { Configuration } from "app/form/types";
import { isDistinct } from "lib/utils/array/isDistinct";

import styles from "./styles.module.css";

const RichDynamicArray = () => {
  return (
    <Space
      direction="vertical"
      size="small"
      className={styles["configuration-fields"]}
    >
      <h4>Configurations</h4>

      <Form.List
        name={fieldPrefix}
        rules={[
          {
            message: "At least 1 configuration",
            validator: async (_, value) => {
              if (!value?.length) {
                return Promise.reject(new Error());
              }
              return true;
            },
          },
          {
            message: "Cannot select same type for multiple configuration",
            validator: async (_, value) => {
              const selectedTypeCollection =
                value?.map((entry: Configuration) => entry.type) ?? [];
              if (
                !isDistinct(selectedTypeCollection) &&
                selectedTypeCollection.length === value.length
              ) {
                return Promise.reject(new Error(""));
              }
              return true;
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => {
          const handleAdd = () => {
            const newRow = {
              type: undefined,
              value: 0,
            };
            add(newRow);
          };
          const removeRow = (index: number) => () => {
            remove(index);
          };

          return (
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Table
                dataSource={fields}
                rowKey="key"
                pagination={false}
                columns={configurationColumns({ removeRow })}
              />

              <Form.ErrorList errors={errors} />

              <Button onClick={handleAdd}>Add</Button>
            </Space>
          );
        }}
      </Form.List>
    </Space>
  );
};

export default RichDynamicArray;

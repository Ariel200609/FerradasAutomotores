export default {
  // Resolved reference cases
  simpleReference: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: '$.values.memory'},
        },
      ],
      values: {
        memory: 1000,
      },
      outputs: [
        {
          name: 'configured-memory',
          value: '$.values.memory',
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: 1000},
        },
      ],
      values: {
        memory: 1000,
      },
      outputs: [
        {
          name: 'configured-memory',
          value: 1000,
        },
      ],
    },

    unresolved: undefined,
  },

  scalarReferences: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            string: '$.values.string',
            int: '$.values.int',
            float: '$.values.float',
          },
        },
      ],
      values: {
        string: 'string',
        int: 1,
        float: 1.2,
      },
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            string: 'string',
            int: 1,
            float: 1.2,
          },
        },
      ],
      values: {
        string: 'string',
        int: 1,
        float: 1.2,
      },
    },

    unresolved: undefined,
  },

  blueprintVersionReference: {
    input: {
      blueprintVersion: '2025-01-01',
      outputs: [
        {
          name: 'version',
          value: '$.blueprintVersion',
        },
      ],
    },

    expected: {
      blueprintVersion: '2025-01-01',
      outputs: [
        {
          name: 'version',
          value: '2025-01-01',
        },
      ],
    },
  },

  deepyNestedObjectReference: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: '$.resources.another-function.config.env.memory'},
        },
        {
          name: 'another-function',
          type: 'cloud-function',
          config: {env: {memory: 1000}},
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: '$.resources.another-function.config.env.memory'},
        },
        {
          name: 'another-function',
          type: 'cloud-function',
          config: {env: {memory: 1000}},
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.a-function.config.memory',
        ref: '$.resources.another-function.config.env.memory',
      },
    ],
  },

  arrayReference: {
    input: {
      resources: [
        {
          name: 'a-project',
          type: 'project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', '$.resources.a-project.name', 'project-2'],
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-project',
          type: 'project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', '$.resources.a-project.name', 'project-2'],
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.a-function.projects[1]',
        ref: '$.resources.a-project.name',
      },
    ],
  },

  // This is so weird please don't do this omg
  deeplyNestedArrayReference: {
    input: {
      resources: [
        {
          name: 'a-project',
          type: 'project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            settings: [
              {
                projects: ['project-1', 'project-2', '$.resources.a-project.name'],
              },
            ],
          },
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-project',
          type: 'project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            settings: [
              {
                projects: ['project-1', 'project-2', '$.resources.a-project.name'],
              },
            ],
          },
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.a-function.config.settings[0].projects[2]',
        ref: '$.resources.a-project.name',
      },
    ],
  },

  arrayReferenceToParams: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', 'project-2', '$.params.project'],
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', 'project-2', 'a-project'],
        },
      ],
    },

    parameters: {
      project: 'a-project',
    },

    unresolved: undefined,
  },

  parameterReference: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: '$.parameters.memory'},
        },
      ],
      parameters: [
        {
          name: 'memory',
          type: 'env-var',
          input: 'MEM',
        },
      ],
    },

    parameters: {
      memory: 1000,
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: 1000},
        },
      ],
      parameters: [
        {
          name: 'memory',
          type: 'env-var',
          input: 'MEM',
        },
      ],
    },

    unresolved: undefined,
  },

  // Unresolved reference cases
  unresolvedReference: {
    input: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: 1000},
        },
        {
          name: 'another-function',
          type: 'cloud-function',
          config: {memory: '$.resources.a-function.config.memory'},
        },
      ],
      outputs: [
        {
          name: 'configured-memory-1',
          value: '$.resources.another-function.config.memory',
        },
        {
          name: 'configured-memory-2',
          value: '$.resources.another-function.config.memory',
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {memory: 1000},
        },
        {
          name: 'another-function',
          type: 'cloud-function',
          config: {memory: '$.resources.a-function.config.memory'},
        },
      ],
      outputs: [
        {
          name: 'configured-memory-1',
          value: '$.resources.another-function.config.memory',
        },
        {
          name: 'configured-memory-2',
          value: '$.resources.another-function.config.memory',
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.another-function.config.memory',
        ref: '$.resources.a-function.config.memory',
      },
      {
        path: 'outputs.configured-memory-1.value',
        ref: '$.resources.another-function.config.memory',
      },
      {
        path: 'outputs.configured-memory-2.value',
        ref: '$.resources.another-function.config.memory',
      },
    ],
  },

  unresolvedArrayReference: {
    input: {
      resources: [
        {
          name: 'a-project',
          type: 'cloud-project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', 'project-2', '$.resources.a-project.name', 'project-4'],
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-project',
          type: 'cloud-project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          projects: ['project-1', 'project-2', '$.resources.a-project.name', 'project-4'],
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.a-function.projects[2]',
        ref: '$.resources.a-project.name',
      },
    ],
  },

  unresolvedDeeplyNestedArrayReference: {
    input: {
      resources: [
        {
          name: 'a-project',
          type: 'cloud-project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            settings: [
              {
                projects: ['$.resources.a-project.name', 'project-2', 'project-3'],
              },
            ],
          },
        },
      ],
    },

    expected: {
      resources: [
        {
          name: 'a-project',
          type: 'cloud-project',
        },
        {
          name: 'a-function',
          type: 'cloud-function',
          config: {
            settings: [
              {
                projects: ['$.resources.a-project.name', 'project-2', 'project-3'],
              },
            ],
          },
        },
      ],
    },

    unresolved: [
      {
        path: 'resources.a-function.config.settings[0].projects[0]',
        ref: '$.resources.a-project.name',
      },
    ],
  },
}

# Segment Selector

## union

primary | secondary

| above1 | below1 | above2 | below2 | Keep? | Action       | Value |
| :----: | :----: | :----: | :----: | :---: | :----------- | :---: |
|   0    |   0    |   0    |   0    |  no   |              |   0   |
|   0    |   0    |   0    |   1    |  yes  | filled below |   2   |
|   0    |   0    |   1    |   0    |  yes  | filled above |   1   |
|   0    |   0    |   1    |   1    |  no   |              |   0   |
|   0    |   1    |   0    |   0    |  yes  | filled below |   2   |
|   0    |   1    |   0    |   1    |  yes  | filled below |   2   |
|   0    |   1    |   1    |   0    |  no   |              |   0   |
|   0    |   1    |   1    |   1    |  no   |              |   0   |
|   1    |   0    |   0    |   0    |  yes  | filled above |   1   |
|   1    |   0    |   0    |   1    |  no   |              |   0   |
|   1    |   0    |   1    |   0    |  yes  | filled above |   1   |
|   1    |   0    |   1    |   1    |  no   |              |   0   |
|   1    |   1    |   0    |   0    |  no   |              |   0   |
|   1    |   1    |   0    |   1    |  no   |              |   0   |
|   1    |   1    |   1    |   0    |  no   |              |   0   |
|   1    |   1    |   1    |   1    |  no   |              |   0   |

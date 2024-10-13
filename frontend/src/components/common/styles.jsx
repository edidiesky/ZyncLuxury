import styled from "styled-components";

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .TableContainer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    overflow-x: auto;

    .tableWrapper {
      border-collapse: collapse;
      overflow-x: auto;
      border-collapse: collapse;
      table-layout: fixed;
      @media (max-width: 780px) {
        max-width: 600px;
        min-width: 600px;
      }

      @media (max-width: 580px) {
        max-width: 600px;
        min-width: 600px;
      }

      thead {
        tr {
          text-align: center;
          transition: all 0.4s;

          border-radius: 40px;
          padding: 1rem 0;
          font-weight: normal !important;
          background-color: #fafafa;
          th {
            text-align: start;
            font-size: 14px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 1.3rem 1rem;
            font-weight: 400;
            font-family: "Karla", sans-serif;
            background-color: #fafafa;
            color: #969a9a;
          }
        }
      }
      .btn {
        padding: 0.4rem 1.3rem !important;
      }
      tbody {
        tr {
          transition: all 0.5s;
          z-index: 200;
          &:hover {
            background-color: #eee;
          }
          td {
            text-align: start;
            font-family: "Karla", sans-serif;
            padding: 1rem !important;
            font-weight: normal !important;
            color: #000;
            border-bottom: 1px solid rgba(0, 0, 0, 0.09);
            line-height: 1.2 !important;

            span {
              &.danger {
                color: #840a0a;
                padding: 0.56rem 1rem;
                border-radius: 4px;
                background: #f3efe5;
              }
              &.success {
                color: #07581a;
                padding: 0.56rem 1rem;
                border-radius: 4px;
                background: #bef4b8;
              }
            }
          }

          .icons {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
              font-size: 1.7rem;
              cursor: pointer;
            }
            &:hover {
              background: #ddd;
            }
          }
        }
      }
    }
  }
`;

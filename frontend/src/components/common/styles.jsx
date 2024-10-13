import styled from "styled-components";

export const Table = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-radius: 3px;
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
      /* @media (max-width: 1080px) {
        max-width: 900px;
        min-width: 900px;
      } */
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
          /* text-transform: uppercase; */
          font-weight: normal !important;
          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
          th {
            text-align: start;
            font-size: 15px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding: 1.7rem;
            font-family: "Karla";
            font-weight: 500 !important;
            @media (max-width: 780px) {
              font-size: 13px !important;
            }
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
            background-color: rgba(0, 0, 0, 0.06);
          }
          td {
            text-align: start;
            font-family: "Karla";
            padding: 1.5rem !important;
            font-weight: normal !important;
            color: #000;
            font-size: 15px !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.09);
            line-height: 1.2 !important;
            @media (max-width: 780px) {
              font-size: 13px !important;
            }

            span {
              font-size: 15px !important;
              @media (max-width: 780px) {
                font-size: 13px !important;
              }
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

import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const CardLoader = () => {
    return (
      <SkeletonThemeCard>
        <div className="w-full flex flex-col gap-2">
          <span className="h-[220px] w-full">
            <Skeleton
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
              }}
            />
          </span>
          <div className="w-full p-3 flex items-center gap-4 justify-between">
            <div className="w-full flex flex-col gap-2">
              <span className="h-[12px] w-full">
                <Skeleton
                  style={{
                    borderRadius: "10px",
                    width: "80%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[10px]">
                <Skeleton
                  style={{
                    borderRadius: "10px",
                    width: "60%",
                    height: "100%",
                  }}
                />
              </span>
              <span className="h-[10px]">
                <Skeleton
                  style={{
                    borderRadius: "10px",
                    width: "50%",
                    height: "100%",
                  }}
                />
              </span>
            </div>
            <span className="h-[30px] w-[70px]">
              <Skeleton
                style={{
                  borderRadius: "100px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </span>
          </div>
        </div>
      </SkeletonThemeCard>
    );
}

const SkeletonThemeCard = ({ children }) => {
    return (
        <SkeletonTheme baseColor="#eee" highlightColor="#f7f7f7">
            {children}
        </SkeletonTheme>
    )
}


export default CardLoader;
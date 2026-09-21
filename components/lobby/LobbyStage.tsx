"use client";

import { useRouter } from "next/navigation";
import { getIndustryById, getIndustryLobbyPlacement, industries } from "@/config/industries";
import { MainStoryScreen } from "@/components/lobby/MainStoryScreen";
import { ShowcaseCabinet } from "@/components/lobby/ShowcaseCabinet";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function LobbyStage() {
  const router = useRouter();
  const { lobbyState, selectedIndustry, returnToLobby } = useExperience();
  const selected = getIndustryById(selectedIndustry);
  const focusWall =
    lobbyState === "cabinet-focus" ? getIndustryLobbyPlacement(selectedIndustry).wall : "none";

  const backToLobby = () => {
    returnToLobby();
    router.push("/");
  };

  return (
    <section
      className={`lobby-stage state-${lobbyState}`}
      data-focus-wall={focusWall}
      aria-label="PACKGO 工业展厅大厅"
    >
      <div className="lobby-status" aria-live="polite">
        <span className="lobby-status__tag">空间视图</span>
        <strong>{lobbyState === "default" ? "PACKGO 大厅 · 入口" : `${selected.shortTitle}展厅`}</strong>
        {lobbyState !== "default" && (
          <button type="button" onClick={backToLobby}>← 返回大厅</button>
        )}
      </div>

      <div className="lobby-hint" aria-hidden="true">
        <span>入口视角</span>
        <span aria-hidden="true">/</span>
        <span>前方主叙事屏</span>
        <span aria-hidden="true">/</span>
        <span>左右展柜与空间纵深</span>
      </div>

      <div className="spatial-scene">
        <div className="lobby-camera">
          <div className="lobby-camera__rig">
            <div className="lobby-hall" aria-hidden="true">
              <div className="hall-ceiling">
                <span className="ceil-truss" />
                <span className="ceil-light ceil-light--1" />
                <span className="ceil-light ceil-light--2" />
                <span className="ceil-light ceil-light--3" />
                <span className="ceil-far-glow" />
              </div>

              <div className="hall-wall hall-wall--left">
                <span className="wall-skin" />
                <span className="wall-rail" />
                <span className="wall-skirting" />
                <span className="wall-niche wall-niche--a" />
                <span className="wall-niche wall-niche--b" />
                <span className="wall-blade" />
              </div>

              <div className="hall-wall hall-wall--right">
                <span className="wall-skin" />
                <span className="wall-rail" />
                <span className="wall-skirting" />
                <span className="wall-niche wall-niche--a" />
                <span className="wall-sign">PACKGO · 包装系统</span>
              </div>

              <div className="hall-wall hall-wall--far">
                <span className="far-seam far-seam--a" />
                <span className="far-seam far-seam--b" />
                <span className="far-portal" />
                <span className="far-trim" />
              </div>

              <div className="hall-floor">
                <span className="floor-grid" />
                <span className="floor-lane" />
                <span className="floor-pool floor-pool--1" />
                <span className="floor-pool floor-pool--2" />
                <span className="floor-pool floor-pool--3" />
                <span className="floor-spill" />
                <span className="floor-decal">PACKGO 工业大厅 · 一层</span>
                <span className="floor-marker" />
              </div>
            </div>

            <MainStoryScreen />

            {industries.map((industry, index) => (
              <ShowcaseCabinet key={industry.id} industry={industry} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

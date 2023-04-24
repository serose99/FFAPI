import { stat } from "fs";

export class Player {
    public id: number;
    public onTeamId: number;
    public active: boolean;
    public defaultPositionId: number;
    public droppable: boolean;
    public eligibleSlots: [];
    public firstName: string;
    public fullName: string;
    public injured: boolean;
    public injuryStatus: string;
    public jersey: number;
    public lastName: string;
    public proTeamId: number;
    public seasonOutlook: string;
    public totalStats: IStats | {};
    public weekStats: IStats | {};
    public weekProjections: IStats | {};

    constructor(player: IPlayer) {
        this.id = player.id;
        this.onTeamId = player.onTeamId;
        this.active = player.active;
        this.defaultPositionId = player.defaultPositionId;
        this.droppable = player.droppable;
        this.eligibleSlots = player.eligibleSlots;
        this.firstName = player.firstName;
        this.fullName = player.fullName;
        this.injured = player.injured;
        this.injuryStatus = player.injuryStatus;
        this.jersey = player.jersey;
        this.lastName = player.lastName;
        this.proTeamId = player.proTeamId;
        this.seasonOutlook = player.seasonOutlook;
        this.totalStats = this.getTotalStats(player.stats);
        this.weekStats = this.getWeekStats(player.stats);
        this.weekProjections = this.getWeekProjections(player.stats);
    }

    private getTotalStats(stats: IStats[]): IStats | {} {
        const totalStats =
            stats.filter((stat) => {
                return stat.scoringPeriodId !== 0 && stat.statSourceId === 1;
            })[0] ?? undefined;
        var statmap = new Map<string, number>();
        Object.keys(totalStats.stats).map((key: string) => {
            statmap.set(ScoringIdMap[key], totalStats.stats[key]);
        });
        totalStats.stats = statmap;
        return totalStats;
    }

    private getWeekStats(stats: IStats[]): IStats | {} {
        const weekStats =
            stats.filter((stat) => {
                return stat.scoringPeriodId !== 0 && stat.statSourceId === 1;
            })[0] ?? undefined;
        var statmap = new Map<string, number>();
        Object.keys(weekStats.stats).map((key: string) => {
            statmap.set(ScoringIdMap[key], weekStats.stats[key]);
        });
        weekStats.stats = statmap;
        return weekStats;
    }

    private getWeekProjections(stats: IStats[]): IStats | {} {
        const weekProjections =
            stats.filter((stat) => {
                return stat.scoringPeriodId !== 0 && stat.statSourceId === 1;
            })[0] ?? undefined;
        var statmap = new Map<string, number>();
        Object.keys(weekProjections.stats).map((key: string) => {
            statmap.set(ScoringIdMap[key], weekProjections.stats[key]);
        });
        weekProjections.stats = statmap;
        return weekProjections;
    }
}

export interface IPlayer {
    id: number;
    onTeamId: number;
    active: boolean;
    defaultPositionId: number;
    droppable: boolean;
    eligibleSlots: [];
    firstName: string;
    fullName: string;
    injured: boolean;
    injuryStatus: string;
    jersey: number;
    lastName: string;
    proTeamId: number;
    seasonOutlook: string;
    stats: IStats[];
}

export interface IESPNPlayer {
    player: IPlayer;
    onTeamId: number;
}

interface IStats {
    appliedTotal: number;
    scoringPeriodId: number;
    statSourceId: number;
    stats: any;
}

interface IScoring {
    passingAttempts: number;
    passingCompletions: number;
    passingIncompletions: number;
    passingYards: number;
    passingTouchdowns: number;
    passing2PtConversions: number;
    passingInterceptions: number;
    rushingAttempts: number;
    rushingYards: number;
    rushingTouchdowns: number;
    rushing2PtConversions: number;
    rushing200PlusYardGame: number;
    receivingReceptions: number;
    receivingYards: number;
    receivingTouchdowns: number;
    receiving2PtConversions: number;
    fumbles: number;
}

const ScoringIdMap: Record<string, string> = {
    "0": "passingAttempts",
    "1": "passingCompletions",
    "2": "passingIncompletions",
    "3": "passingYards",
    "4": "passingTouchdowns",
    "19": "passing2PtConversion",
    "20": "passingInterceptions",
    "23": "rushingAttempts",
    "24": "rushingYards",
    "25": "rushingTouchdowns",
    "26": "rushing2PtConversion",
    "38": "rushing200PlusYardGame",
    "41": "receivingReceptions",
    "42": "receivingYards",
    "43": "receivingTouchdowns",
    "44": "receiving2PtConversions",
    "68": "fumbles",
};
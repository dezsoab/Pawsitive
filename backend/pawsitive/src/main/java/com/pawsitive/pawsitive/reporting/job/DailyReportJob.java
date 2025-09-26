package com.pawsitive.pawsitive.reporting.job;

import com.pawsitive.pawsitive.reporting.Report;
import com.pawsitive.pawsitive.reporting.service.ReportSenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DailyReportJob {
    private static final Logger logger = LoggerFactory.getLogger(DailyReportJob.class);


    private final ReportSenderService reportSenderService;
    private final List<Report> reports;

    public DailyReportJob(ReportSenderService reportSenderService, List<Report> reports) {
        this.reportSenderService = reportSenderService;
        this.reports = reports;
    }

    // Runs every 5 minutes
    @Scheduled(cron = "0 0 18 * * ?", zone = "Europe/Vienna")
    public void run() {
        logger.info("Running scheduled report job with {} reports", reports.size());
        for (Report report : reports) {
            logger.info("Sending report: {}", report.getTitle());
            reportSenderService.sendReport(report);
        }
    }
}

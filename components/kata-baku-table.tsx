"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { quizData } from "@/data/kata-baku";
import { Search } from "lucide-react";

export default function KataBakuTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 50;

  // Convert quizData to array format for easier pagination
  const kataData = Object.entries(quizData).map(([tidakBaku, baku]) => ({
    tidakBaku,
    baku
  }));

  // Filter data based on search term
  const filteredData = kataData.filter(item =>
    item.tidakBaku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.baku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Split current data into two columns
  const leftColumn = currentData.slice(0, 25);
  const rightColumn = currentData.slice(25, 50);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const renderMobileTable = (data: typeof currentData, startOffset: number) => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-background rounded-lg border border-border/40 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              #{startIndex + startOffset + index + 1}
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Kata Tidak Baku:</div>
              <div className="text-base font-medium text-foreground">{item.tidakBaku}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Kata Baku:</div>
              <div className="text-base font-semibold text-foreground">{item.baku}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableColumn = (data: typeof currentData, startOffset: number) => (
    <div className="bg-background rounded-xl border-2 border-border/60 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border/30 scrollbar-track-transparent">
        <table className="w-full border-collapse min-w-[400px]">
          <thead className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b-2 border-border/40">
            <tr>
              <th className="text-center py-3 px-4 font-semibold text-xs uppercase tracking-wide w-16 text-muted-foreground border-r border-border/30">Nomor</th>
              <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wide text-muted-foreground border-r border-border/30">Kata Tidak Baku</th>
              <th className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wide text-muted-foreground">Kata Baku</th>
            </tr>
          </thead>
          <tbody className={isLoading ? "opacity-50" : ""}>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-border/25 hover:bg-primary/8 transition-all duration-200 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/15'}`}
              >
                <td className="py-3 px-4 text-base text-muted-foreground font-medium text-center align-middle border-r border-border/30">{startIndex + startOffset + index + 1}</td>
                <td className="py-3 px-4 text-base font-medium text-foreground align-middle border-r border-border/30">{item.tidakBaku}</td>
                <td className="py-3 px-4 text-base font-semibold text-foreground align-middle">{item.baku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-background rounded-lg border border-border/40 p-4 animate-pulse"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 w-8 bg-muted/30 rounded"></div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="h-3 w-24 bg-muted/30 rounded mb-1"></div>
              <div className="h-4 w-32 bg-muted/30 rounded"></div>
            </div>
            <div>
              <div className="h-3 w-20 bg-muted/30 rounded mb-1"></div>
              <div className="h-4 w-28 bg-muted/30 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="tabel-kata-baku" className="w-full min-h-screen pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-gradient-to-br from-primary/5 via-background to-muted/40 dark:from-background dark:to-muted/30 shadow-[0_8px_32px_0_rgba(60,60,60,0.08)]">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4 tracking-tight px-2">
            Tabel Kata Baku dan Tidak Baku
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-3 sm:mb-5 md:mb-8 px-3 sm:px-4">
            Tabel ini berisi kumpulan kata yang dapat membantu Anda
            menggunakan bahasa Indonesia yang benar.
          </p>
          <div className="text-xs sm:text-sm text-muted-foreground max-w-4xl mx-auto mb-3 sm:mb-5 md:mb-8 px-3 sm:px-4">
            Data kata baku dan tidak baku diambil dari repository GitHub <a href="https://github.com/lantip/baku-tidak-baku" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">lantip/baku-tidak-baku</a>. Terima kasih kepada para kontributor dan <a href="https://x.com/ivanlanin" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary font-semibold">@ivanlanin</a> atas data dan inspirasinya.
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2 sm:px-3">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-muted-foreground">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Cari kata baku atau tidak baku..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow text-base"
            />
            {searchTerm && (
              <div className="absolute right-2">
                <Button size="sm" variant="ghost" onClick={() => handleSearch("")}>Reset</Button>
              </div>
            )}
          </div>
          {searchTerm && (
            <div className="p-2 sm:p-3 md:p-4 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Menampilkan {filteredData.length} hasil dari pencarian &quot;{searchTerm}&quot;
              </p>
            </div>
          )}
        </div>

        <Card className="w-full shadow-md border-0 rounded-xl">
          <CardContent className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 px-2 sm:px-3 md:px-4 lg:px-12 flex flex-col gap-4 sm:gap-6 md:gap-8">
            {filteredData.length === 0 ? (
              <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-xl sm:text-2xl md:text-4xl">🔍</span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-2xl font-semibold text-foreground mb-1 sm:mb-2">
                    Tidak ada kata yang ditemukan
                  </h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 md:mb-6 max-w-md mx-auto text-xs sm:text-sm md:text-base px-2">
                    Tidak ada kata yang cocok dengan pencarian &quot;{searchTerm}&quot;.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => handleSearch("")}
                    className="px-3 sm:px-4 md:px-6 py-2 sm:py-3"
                  >
                    Hapus Pencarian
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile Layout */}
                <div className="block xl:hidden space-y-3 sm:space-y-4 md:space-y-6">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3 md:mb-4 px-2">
                      Semua Data
                    </div>
                    {isLoading ? renderLoadingSkeleton() : renderMobileTable(currentData, 0)}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden xl:grid xl:grid-cols-2 gap-3 sm:gap-4 md:gap-6 pb-2 sm:pb-3 md:pb-4">
                  <div className="space-y-2">{renderTableColumn(leftColumn, 0)}</div>
                  <div className="space-y-2">{renderTableColumn(rightColumn, 25)}</div>
                </div>

                {/* Centered Pagination */}
                <div className="bg-gradient-to-r from-muted/10 to-muted/20 border-t border-border/30 rounded-xl py-2">
                  <div className="max-w-6xl mx-auto px-2 sm:px-3 md:px-4 lg:px-8 flex justify-center">
                    <Pagination>
                      <PaginationContent className="flex flex-wrap justify-center gap-1">
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              if (currentPage > 1) handlePageChange(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === 'ellipsis' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                isActive={currentPage === page}
                                onClick={e => {
                                  e.preventDefault();
                                  handlePageChange(page as number);
                                }}
                                className="min-w-[24px] sm:min-w-[28px] md:min-w-[32px] px-1 sm:px-1.5 md:px-2 text-xs sm:text-sm"
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              if (currentPage < totalPages) handlePageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 
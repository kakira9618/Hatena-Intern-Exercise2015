use strict;
use warnings;

use Data::Dumper;

use Parser;
use LogViewer;

my $parser = Parser->new( filename => '../sample_data/large_log.ltsv' );
my $viewer = LogViewer->new($parser->parse);
print 'Method Distribution: ' . "\n";
print $viewer->display_method_info . "\n";

print 'Method Detail: ' . "\n";
print $viewer->display_method_info_detail . "\n";
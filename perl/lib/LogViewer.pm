package LogViewer;
use strict;
use warnings;
use Parser;
use Data::Dumper;


sub new {
	my ($class, $logs) = @_;
	return bless { logs => $logs }, $class;
};

# logsからmethod, pathに関する情報を解析して、そのデータを返す。
# 例：
# [
# 	{
# 		'method_count' => 336,
# 		'method_name' => 'GET',
# 		'request_path' => {
# 			'/bookmark' => 96,
# 			'/fotolife' => 48,
# 			'/profile' => 80,
# 			'/' => 64,
# 			'/blog' => 48
# 		}
# 	},
# 	…
# ];
sub count_method {
	my $self = shift;
	my @result;
	my $allcount = @{$self->{logs}};

	foreach(@{$self->{logs}}) {
		my $method = $_->method;
		my $path = $_->path;
		my $methodindex = -1;
		my $i = 0;
		foreach my $r (@result) {
			if ($r->{'method_name'} eq $method) {
				$methodindex = $i;
				last;
			}
			$i++;
		}
		if ($methodindex == -1) {
			my $newmethod_ref = {
				method_name => $method,
				method_count => 1,
				request_path => {
					$path => 1
				}
			};
			push(@result, $newmethod_ref);
		} else {
			$result[$methodindex]->{'method_count'}++;
			if (exists $result[$methodindex]->{'request_path'}->{$path}) {
				$result[$methodindex]->{'request_path'}->{$path}++;
			} else {
				$result[$methodindex]->{'request_path'}->{$path} = 1;
			}
		}
	}

	return \@result;
}

# どのようなmethodでアクセスされたのかを棒グラフにして表示する
sub display_method_info {
	my $self = shift;
	my @methoddata = @{$self->count_method};
	my $allcount = 0;
	my $maxmethodlength = 0;
	foreach(@methoddata) {
		$allcount += $_->{method_count};
		if ($maxmethodlength < length $_->{method_name}) {
			$maxmethodlength = length $_->{method_name};
		} 
	}
	for (1..$maxmethodlength) {
		print '-';
	}
	print ":        100       200       300       400       500\n";

	foreach(@methoddata) {
		my $methodname = $_->{method_name};
		print $methodname; 
		for (1..$maxmethodlength - length $methodname) {
			print " ";
		}
		print ":";
		my $n = 0;
		while ($n + 10 < $_->{method_count}) {
			print '=';
			$n += 10;
		}

		print "*\n";
	}

}

#methodの情報を表示。methodごとにアクセスされたpathを大きい順に表示。
sub display_method_info_detail {
	my $self = shift;
	my @methoddata = @{$self->count_method};
	my $allcount = 0;
	foreach(@methoddata) {
		$allcount += $_->{method_count};
	}
	foreach(@methoddata) {
		print $_->{method_name} . " (" . $_->{method_count} . " requests, " . 100 * $_->{method_count} / $allcount . "% of the all requests)\n";
		for my $key (
			sort {
				$_->{request_path}->{$b} <=> $_->{request_path}->{$a} || $a cmp $b
			} keys %{$_->{request_path}}
		) {
			print " " . $_->{request_path}->{$key}. " :" . $key  . "\n"; 
		}
		print "\n";
	}

}
1;
